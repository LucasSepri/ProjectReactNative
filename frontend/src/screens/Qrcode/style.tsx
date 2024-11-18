import { StyleSheet } from "react-native";

export const styles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraHeader:{
    backgroundColor: theme.secondary,
    width: '100%',
  },
  cameraHeaderText:{
    textAlign: 'center',
    padding: 10,
    color: theme.white,
    fontSize: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  squareButton: {
    position: 'absolute',
  },
  containerQr: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    width: 60,
    height: 60,
    borderColor: 'white',
  },
  topLeft: {
    borderTopWidth: 4,
    borderLeftWidth: 4,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRight: {
    borderTopWidth: 4,
    borderRightWidth: 4,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeft: {
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    borderBottomWidth: 4,
    borderRightWidth: 4,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
