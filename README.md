# angular-signals-what-why-how
Repo based on Angular Signals course


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

## How
### Create









