Getting the square to move was hard

First of all, I needed these two articles:
    This article helped me realize I needed to use document.addEventListener:
            https://www.reddit.com/r/reactjs/comments/w8hdd5/how_to_handle_keyboard_events_the_proper_way_in/
    I blatantly ripped this custom hook from the first answer (it was crucial to get window height/width):
        https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

This answer and it's fiddle saved the day:
https://stackoverflow.com/questions/59546928/keydown-up-events-with-react-hooks-not-working-properly

Update: well, actually, they did give me a good solution (see "way 1"),
but the better thing was just using plain refs (see "way 2")
as in the first answer at this link:
******
    https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
******
I feel like I tried this... I'm not sure why it didn't work before
(also, look at the last link I wrote, and the comments therein: search
for "closure": you need to understand closures in React better.)

Anyway, yes, the above two answers were really what I needed to find.
Here is a summary of the hours of looking for answers that didn't help me:
    This article what was what led me astray:
        https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
            The reason being: I was able to look at the updated ref,
            but not update the state with it, thus, I wasn't able to change
            the DOM when the state updated
    useCallback and callback refs did not help me:
        https://stackoverflow.com/questions/55838351/how-do-we-know-when-a-react-ref-current-value-has-changed
            (I had a lot of faith in the above article's first answer...)
        https://react.dev/reference/react/useCallback#reference
        https://react.dev/learn/manipulating-the-dom-with-refs
        https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
        https://stackoverflow.com/questions/65016565/react-why-is-that-changing-the-current-value-of-ref-from-useref-doesnt-trigger
    nor did the ref JSX attribute
        https://react.dev/reference/react-dom/components/common#ref-callback


This,
    https://overreacted.io/making-setinterval-declarative-with-react-hooks/
and this
    https://react.dev/learn/reusing-logic-with-custom-hooks
are going to be useful with the setInterval stuff I need to do,
and learning custom hooks in general
