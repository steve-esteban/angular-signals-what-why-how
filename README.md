# angular-signals-what-why-how
Repo based on Angular Signals course

Source: https://youtu.be/oqYQG7QMdzw
# Signals
- Provide a new way for our code to tell our templates (and other code) that our data has changed
- Improving **change detection**
- Making code more **reactive**
- Available for developer preview in Angular v16

## Why

We want to react to changes. If

```
let x = 1;
let y= 2;
let z = x + z;
```

We want to see the changes in `x` and `y` being reflected in `z`.

To achieve this we can use
- Getter
```
get z() {
    return x + y
}
```
- Event
```
onXYChange() {
    z = x + y
}
```

What if the value were in serpate components. We can use:
- **Signals**.
```
const x = signal(1);
const y = signal(2);
const z = computed(() => x() + y());
x.set(3); // This will update z as well
```

- Provide more reactivity
- Finer control over change detection

## What


Signal = Value + Change notification

- Signals are reactive
- A signal always has a value
- A signal is side effect free (cause its reader is a simple pure function)
    - Reading a signal can cause no other changes nor execute any other code. Side effect occurs when a function uses or relies on code from outside. For example as it can happen with impure function: 
    ```
    let counter = 0;
    function increment() {
        return counter++;
    }
    ```

## Where
- Component
- Directive
- Service
- Template
- Anywhere else...

## How
### Create a Signal
Create: `quantity = signal<number>(1);`

- A signal created with the signal() constructor function is writable
- The signal value can be:
    - Set to a new value
    - Updated based on its current value
    - Or its content mutated (for arrays or objects)

Read: `quantity();`
- Calling the signal's getter function
- Reads the current value of the signal

### Set a Signal
Replace a value: `this.quantity.set(qty);`

- Setting a signal replaces the current value with a new value
- Notifies any consumer* that the signal changed
- Those consumers update when it's their turn to execute

- A signal does not emit values (it isn't like an Observable)

Update a value based on current value: `this.quantity.update(x=> x*2);`

To change the content of a signal (not the signal itself) use mutate.
Mutate content in place (not value itself): `this.selectedVehicle.mutate(v => v.price = v.price + (v.price * 20));`

### Define a Computed Signal
A computed signal changes when its computed signals change

`exPrice = computed(() => this.selectedVehicle().price * this.quantity());`

- Creates a new signal that depends on other signals
- A computed signal si read only
- It cannot be modified with set(), update() or mutate()
- Value is re-computed when one (or more) of its dependent signals is changed.
- The computed value is **memoized** meaning it stores the computed result
- That computed value is reused next time the computed value is read (like a shareReplay)

### Use effect for Side effects
Use an effect when you want to run some code when a signal changes and that code has side effects
`effect(() => console.log(this.selectedVehicle()));`

It's like the Observable tap operator. That automatically "subscribes" to the signal

- Does not change the value in the signal
- The effect function is run when:
    - One (or more) of its dependent signals is changed
    - AND it's his code's turn to execute

When to user Effects:
- Logging
- External APIs (not RxJS)
- Not commonly used

## Signals in templates
If a signal is used in a template, Angular registers the signal as a depdendency of the view. If the signal changes, the view is re-rendered.
- Signals will mark OnPush components for check (similar to the async pipe)


## Suggestions
- Continue to use event handlers for user actions
- Use a signal or computed for any state (Data) that could change
- Continue to use Observables for async operations (http.get)











