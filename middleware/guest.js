export default function({store, redirect}){
    if(store.getters['auth/aunthenticated']){
        return redirect('/');
    }
}