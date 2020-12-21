import React from 'react';
import { TouchableWithoutFeedback, Text, Image } from 'react-native';
import { theme } from '../../../utils/constants';
import Block from '../../../components/Pattern/Block';
import styles from './style';

class Card extends React.Component {
  render() {
    const {
      item,
      horizontal,
      style,
      titleStyle,
      onDelete,
      onPrepareEdit,
      onApprove,
      onDisapprove,
      onPrepareViewMore,
      listagem,
      tipo
    } = this.props;

    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    const isView = {
      data: listagem === "cirurgia" || listagem === "tratamento" || listagem === "dica",
      titulo: listagem === "dica",
      nome: listagem === "cirurgia" || listagem === "tratamento" || listagem === "hospital" || listagem === "colaborador",
      email: listagem === "hospital",
      telefone: listagem === "hospital" || listagem === "colaborador" ,
      endereco: listagem === "hospital" && tipo === "comum",
      descricao: listagem === "cirurgia" || listagem === "tratamento" || listagem === "dica" || listagem === "depoimento"
    }

    const blockItem = (item, isView) => {
      if(isView && item && item !== "") {
        return (<Block>
          <Text
              style={titleStyles}
              size={12}
              color={theme.COLORS.BLACK}
          >
            {item}
          </Text>
        </Block>);
      }

      return null;
    }

    const actionsButton = (isView, type) => {

      if(isView && type === "colaborador") {
        return (<>
          <Block flex right={true}>
            <Text
                style={styles.buttonEditar}
                size={12}
                bold
                onPress={onPrepareEdit}
            >
              Editar
            </Text>
          </Block>

          <Block flex left={true}>
            <Text
                style={styles.buttonExcluir}
                size={12}
                bold
                onPress={onDelete}
            >
              Excluir
            </Text>
          </Block>
        </>);
      }

      if(isView && type === "administrador") {
        return (<>
          <Block flex center={listagem !== "colaborador"} right={listagem === "colaborador"}>
            <Text
                style={styles.buttonAprovar}
                size={12}
                bold
                onPress={onApprove}
            >
              Aprovar
            </Text>
          </Block>

          <Block flex center={listagem !== "colaborador"} left={listagem === "colaborador"}>
            <Text
                style={styles.buttonReprovar}
                size={12}
                bold
                onPress={onDisapprove}
            >
              Reprovar
            </Text>
          </Block>

          {listagem !== "colaborador" &&
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AdmReportar')}>
              <Block flex center={true}>
                <Text
                    style={styles.buttonReportar}
                    size={12}
                    bold
                >
                  Reportar
                </Text>
              </Block>
            </TouchableWithoutFeedback>
          }
        </>);
      }

      return null;
    }

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => {}}>
          {item.imagem ? (
              <Block flex style={imgContainer}>
                <Image resizeMode="cover" source={item.imagem} style={styles.fullImage} />
              </Block>) : (
              <Block />)
          }
        </TouchableWithoutFeedback>
          {listagem !== "depoimento" && tipo !== "comum" &&
            <Block flex space="between" style={styles.cardDescription}>
              {blockItem(item.data, isView.data)}
              {blockItem(item.titulo, isView.titulo)}
              {blockItem(item.nome, isView.nome)}
              {blockItem(item.email, isView.email)}
              {blockItem(item.telefone, isView.telefone)}
              {blockItem(item.endereco, isView.endereco)}
              {blockItem(item.descricao, isView.descricao)}

              <Block row space="between">
                {actionsButton(this.props.item.status.pendente, this.props.tipo)}
              </Block>
            </Block>
          }

          {listagem === "depoimento" && tipo === "comum" &&
            <Block flex space="between" style={styles.cardDescription}>
              {blockItem(item.pessoa.nome, true)}
              {blockItem(item.data, true)}
              {blockItem(item.titulo, true)}

              <Block right={true}>
                <Text
                    style={styles.buttonViewMore}
                    size={12}
                    bold
                    onPress={onPrepareViewMore}
                >
                  Ver Mais
                </Text>
              </Block>
            </Block>
          }

        {listagem === "hospital" && tipo === "comum" &&
        <Block flex space="between" style={styles.cardDescription}>
          {blockItem(item.nome, true)}
          {blockItem(item.email, true)}
          {blockItem(item.telefone, true)}
          {blockItem(item.endereco, true)}
        </Block>
        }

        {listagem === "depoimento" && tipo === "administrador" &&
          <Block flex space="between" style={styles.cardDescription}>
            {blockItem(item.pessoa.nome, true)}
            {blockItem(item.data, true)}
            {blockItem(item.titulo, true)}
            {blockItem(item.descricao, true)}

            <Block row space="between">
              {actionsButton(this.props.item.status.pendente, this.props.tipo)}
            </Block>
          </Block>
        }
      </Block>
    );
  }
}

export default Card;