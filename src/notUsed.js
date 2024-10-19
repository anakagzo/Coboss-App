// set an initializing state whilst Firebase connects  
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();

// Handle user state changes
function onAuthStateChanged(user) {
  setUser(user);
  if (initializing) {
    setInitializing(false);  
  }
}

console.log(user);
useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; //unsubscribe on unmount
}, []);

if (initializing){
  return null;
}

if (user){
  console.log(user);
}