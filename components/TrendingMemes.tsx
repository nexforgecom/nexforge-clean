useEffect(() => {
  fetch('https://api.dexscreener.com/latest/dex/search?q=base meme')
    .then(res => res.json())
    .then(data => setTrending(data.pairs || []));
}, []);
