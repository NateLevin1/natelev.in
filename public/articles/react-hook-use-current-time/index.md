# React Hook: useCurrentTime

![HEADER|React Hook: useCurrentTime graphic](images/header.jpg)

Here is a neat little TypeScript React hook I created today that returns a live-updating `Date` representing the current time.

```ts
function useCurrentTime(msBetweenUpdates: number = 1_000) {
    const [curTime, setCurTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurTime(new Date());
        }, msBetweenUpdates);
        return () => clearInterval(intervalId);
    }, [msBetweenUpdates]);

    return curTime;
}
```

Usage examples:

```ts
// updated every second
const curTime = useCurrentTime();

// updated every 30 seconds
const delayedTime = useCurrentTime(30 * 1_000);
```

It _will_ cause your component to re-render — if you don't want this behavior, just set a variable equal to `new Date()`.

SUGGESTED|/articles/host-your-site-for-free-on-jamstack/[t]Host Your Site For Free On JAMstack

ISSUE|3

<!-- Compile with "npm run build-article src/articles/react-hook-use-current-time/ -- --out src/articles/react-hook-use-current-time/index.html" -->
