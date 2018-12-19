import React, { Component } from 'react'
import { connect } from 'react-redux'
import PDFView from 'react-native-view-pdf/lib/index'
import { View, Container, Header, Title, Content, Icon, H2, H3, Text } from 'native-base'
import stylesDefault from './Styles/DefaultBaseStyles'
import WorkOrderActions from '../Redux/WorkOrderRedux'

class DocumentPage extends Component {
  componentDidMount() {
    const { requestDocument, token } = this.props
    const {
      state: { params: { docKey } }
    } = this.props.navigation

    requestDocument(token, docKey)
  }

  render() {
    const { header, mainBackgroundColor, headerTitle, navBackButton, subHeader, subHeader_title, subHeader_subtitle, subHeader_text } = stylesDefault
    const { goBack } = this.props.navigation
    const { document, fetchingDocument } = this.props

    if (document === null || fetchingDocument)
      return (
        <Container>
          <Header style={[header, mainBackgroundColor]}>
            <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
            <Title style={headerTitle}>Document</Title>
          </Header>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <H2 style={[subHeader_title, { marginBottom: 10 }]}>LOADING</H2>
            <H3 style={subHeader_subtitle}>Please wait...</H3>
          </View>
        </Container>
      )
    else {
      return (
        <Container>
          <Header style={[header, mainBackgroundColor]}>
            <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
            <Title style={headerTitle}>{document.Name}</Title>
          </Header>
          {document && document.DocumentType === "application/pdf" &&
            <View style={{ height: 900 }}>
              <PDFView
                style={{ flex: 5 }}
                resource={document.Docfile.split(',')[1]}
                resourceType={'base64'}
                onLoad={() => console.log(`PDF rendered from`)}
                onError={(error) => console.log('Cannot render PDF', error)}
              />
            </View>}
          {document && document.DocumentType !== "application/pdf" &&
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <H2 style={[subHeader_title, { marginBottom: 10 }]}>OOPS!</H2>
              <Text style={subHeader_text}>Something went wrong when trying to open the file.</Text>
              <Text style={[subHeader_text, { marginBottom: 10 }]}>Is not possible to open a file of type:</Text>
              <H3 style={subHeader_subtitle}>{document.DocumentType}</H3>
            </View>}
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    document: state.workOrder.document,
    fetchingDocument: state.workOrder.fetchingDocument,
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestDocument: (token, docKey) => dispatch(WorkOrderActions.documentByIdRequest(token, docKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage)
