import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import './App.css';

function App() {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Home Page</h1>
      <header>
        <Show when='signed-out'>
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </Show>
        <Show when='signed-in'>
          <UserButton />
        </Show>
      </header>
    </div>
  );
}

export default App;
