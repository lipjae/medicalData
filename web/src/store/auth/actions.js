import { auth } from '../../boot/fb'

export default {

  initAuth({ commit }) {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;

          console.log(uid)

          commit('setLoginState', true)
          resolve()
          
        } else {
          commit('setLoginState', false)
          resolve()
          // User is signed out
          // ...
        }

        commit('setInitComplete', true)
      });
    })
    
  },
  
  signUp({ commit }, { email, password }){
    return auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        
        return {
          result: true,
          msg: '',
        }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        switch(errorCode){
          case 'auth/weak-password': 
            errorMessage = '비밀번호는 최소 6자리 이상으로 해주세요.'
            break;
          case 'auth/email-already-in-use':
            errorMessage = '이미 사용중인 이메일 입니다.'
            break;
        }
        return {
          result: false,
          msg: errorMessage,
        }
      });
  },
  

  signIn({ commit }, { email, password }) {
    return auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        
        return {
          result: true,
          msg: '',
        }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        switch(errorCode) {
          case 'auth/wrong-password':
            errorMessage = '비밀번호가 잘못되었습니다.'
            break;
          case 'auth/user-not-found':
            errorMessage = '해당 아이디를 찾을 수 없습니다.'
            break
        }
        
        return {
          result: false,
          msg: errorMessage
        }
      })
  },

  async logout({ commit }) {
    return await auth.signOut()
  }
}