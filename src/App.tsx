import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import UsersList from "./components/UsersList";

function App() {
	return (
		<>
			<h1>Redux Toolkit Project</h1>
			<UsersList />
			<CreateNewUser />
		</>
	);
}

export default App;
