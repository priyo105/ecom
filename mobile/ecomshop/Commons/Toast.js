import Toast from 'react-native-toast-message';


export const showToastSuccess = (message1,message2,type) => {
    Toast.show({
      type: 'success',
      text1: message1,
      text2: message2,
      position:'bottom'
    });
  }



  
export const showDanger = (message1,message2,type) => {
    Toast.show({
      type: 'error',
      text1: message1,
      position:'bottom',
      text2: message2
    });
  }
