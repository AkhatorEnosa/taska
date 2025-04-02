import { CardProvider } from "./context/CardContext";
import Content from "./sections/Content"
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return (
    <CardProvider>
    <div className="w-screen h-screen flex bg-gray-200/40 overflow-scroll">
      <Content />
    </div>
    </CardProvider>
  )
}

export default App
