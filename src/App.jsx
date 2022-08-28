import { store } from './redux/store/store'
import AppRouters from './router/AppRouter'
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <AppRouters/>
        </Provider>
    )
}

export default App
