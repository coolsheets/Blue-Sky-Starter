

function CounterButton() {
    // This component will be used to increment a counter when clicked.
    return(console.log("CounterButton component loaded"),
        <button onClick={() => console.log("Button clicked!")}>
            Click me!
        </button>
    );
}