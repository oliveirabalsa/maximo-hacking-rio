import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666699',
    textTransform: 'uppercase'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  input: {
    padding: 4,
    borderBottomColor: '#4682B4',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 4,
    fontSize: 16,
    height: 40,
    marginBottom: 20,
  },

  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  detailsButton: {
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
  },

  detailsButtonText: {
    color: '#666699',
    fontSize: 20,
    padding: 4
  },
  snackbar: {
    backgroundColor: 'green',
    position: 'absolute',
    top: 20,
    right: 0,
    width: 300,
    textAlign: 'center',
    margin: 0
  }
});