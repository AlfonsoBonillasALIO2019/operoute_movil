import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import PDFView from 'react-native-view-pdf/lib/index'
import { View, Container, Header, Title, Content, List, ListItem, Text, Icon } from 'native-base'
import { Images } from '../Themes'
import WorkOrder from '../Components/WorkOrder'
import stylesOrder from './Styles/WorkOrderStyles'
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
    const { header, mainBackgroundColor, headerTitle, navBackButton } = stylesDefault
    const { goBack } = this.props.navigation
    const { document } = this.props

    console.log("document --> ", document)

    if (document === null)
      return (
        <Container>
          <Header style={[header, mainBackgroundColor]}>
            <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
            <Title style={headerTitle}>Document: Loading</Title>
          </Header>
        </Container>
      )
    else {
      return (
        <Container>
          <Header style={[header, mainBackgroundColor]}>
            <Icon onPress={() => goBack(null)} style={navBackButton} name='ios-arrow-back' />
            <Title style={headerTitle}>{document.Name}</Title>
          </Header>
          <Content>
            {document && document.DocumentType == "application/pdf" &&
              <View style={{ flex: 1 }}>
                <PDFView
                  style={{ flex: 1, height: 1000 }}
                  resource={document.Docfile.split(',')[1]}
                  resourceType={'base64'}
                  onLoad={() => console.log(`PDF rendered from`)}
                  onError={(error) => console.log('Cannot render PDF', error)}
                />
              </View>
            }
          </Content>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    document: state.workOrder.document,
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestDocument: (token, docKey) => dispatch(WorkOrderActions.documentByIdRequest(token, docKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage)
