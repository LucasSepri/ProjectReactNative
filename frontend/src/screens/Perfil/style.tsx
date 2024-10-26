import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/COLORS";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 160,
    marginBottom: 20,
    backgroundColor: COLORS.lightGrey,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.darkGrey,
  },
  telefone: {
    fontSize: 18,
    color: COLORS.grey,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
    color: COLORS.grey,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: COLORS.blue,
  },
  dangerButton: {
    backgroundColor: COLORS.red,
  },
  logoutButton: {
    backgroundColor: COLORS.darkGrey,
  },
  editText: {
    color: COLORS.white,
  },
  dangerText: {
    color: COLORS.white,
  },
  logoutText: {
    color: COLORS.white,
  },
});

export default styles;