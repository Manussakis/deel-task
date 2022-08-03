# Part 2 (up to 45 minutes)

Please answer the following questions to the best of your knowledge, in clear English. Elaborate and try to demonstrate the React knowledge you have. Feel free to give examples and use cases.

**DO NOT USE ANY WEB OR OTHER RESOURCE.**

**1. What is the difference between Component and PureComponent? give an example where it might break my app.**

Just like functions, components can also have a "pure" behavior. Meaning that given the same props and states the component always returns the same result. PureComponent tends to be more fast than regular components since React doesn't need to do a deep comparison of the old and new values.

If you use a PureComponent but your data need more than a shallow comparison in order to know whether the component should update or not, you might break your app.

**2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?**

Unfortunately, I can't elaborate on an adequate answer to this question.

**3. Describe 3 ways to pass information from a component to its PARENT.**

I can only remember 2 ways:

1 - The parent component passes a function as a prop to the child component. The child component then calls this function passing the data as a parameter to this function.

2 - If the information is part of a Context or a Store, both parent and child components can access it. Once the child component modifies the information, the parent component will get the updated value.

**4. Give 2 ways to prevent components from re-rendering.**

1 - By wrapping the component with the `memo` function and providing (as a second parameter) the condition that determines whether the component should be re-rendered or not.

2 - If a component receives a prop that comes from a variable that was created using the `useMemo` hook, and the dependencies of this variable didn't change after re-rendering the parent component, then the child component will not re-render (unless there are other props that did change).

**5. What is a fragment and why do we need it? Give an example where it might break my app.**

The Fragment is an empty HTML tag that is used to wrap the component's template. JSX needs to return a single element, if the template doesn't have it, Fragment must be used otherwise the app will break.

The example below will break the app:

```javascript
const MyComp = () => {
  return (
    <div>Foo</div>
    <div>Bar</div>
  )
}
```

It can be fixed to:

```javascript
const MyComp = () => {
  return (
    <>
      <div>Foo</div>
      <div>Bar</div>
    </>
  )
}
```

**6. Give 3 examples of the HOC pattern.**

HOC stands for High Order Component, meaning a function that accepts a component as a parameter, performs some modifications, and then returns a new component. This technique can avoid duplicate code.

Examples of HOC in React are `memo` and `forwardRef` functions.

**7. what's the difference in handling exceptions in promises, callbacks and async...await.**

1 - Promises: The error is caught within the `catch` method.

2 - Async...await and Callbacks: The `try...catch` block must be used to catch the error.

**8. How many arguments does setState take and why is it async.**

The `setState` function is used in class-based components and accepts two arguments:

1 - The new value to which the state should be updated;
2 - A callback that has access to the updated state.

`setState` is async because react has an internal algorithm to decide the best moment to update the state.

With `useState`, if you want to get the new state after updating it, the `useEffect` hook is the best option.

**9. List the steps needed to migrate a Class to Function Component.**

1 - Identify the lifecycle methods that were used (not every class-based component can be converted to the functional component as there are lifecycle methods that only exist in class-based components).

2 - Override the lifecycle method by using hooks.

3 - Convert `setState` method to `useState` hook.

4 - Manage the `this` keyword properly.

5 - Remove the `render` method and use only `return` instead.

6 - Remove unnecessary imports.

**10. List a few ways styles can be used with components.**

1 - Importing a `css`/`scss` file directly within the component.

2 - Using `css`/`scss` modules.

3 - Using Styled components

4 - Using Tailwind library.

**11. How to render an HTML string coming from the server.**

String coming from the server might be dangerous as it may contain malicious code. You need to use the `dangerouslySetInnerHTML` prop.

Exemple:
```javascript
dangerouslySetInnerHTML={{__html: yourHTMLString)}}
```
