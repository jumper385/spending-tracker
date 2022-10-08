<script>
    const randomGif = () => {
        let gifs = ["UZ8rFjJvlfGrm", "12pJ8OxSWwO86Y", "67ThRZlYBvibtdF9JH", "K0fCYZRbETczFWydo0", "xm4uYTatdDtbmCsBCw", "eTrYclI5fuEIzuTo3A","xT5LMYj7zNov6QhN28", "xTiTnqUxyWbsAXq7Ju"];
        let randomIndex = Math.floor(Math.random() * gifs.length);
        let gifid = gifs[randomIndex];

        let gifOut = `https://i.giphy.com/media/${gifid}/giphy.webp`;

        return gifOut;
    };
    let gif = randomGif();
</script>

<h1>Dolly</h1>
<p>A simple Expenses Tracker</p>

<img src={gif} alt="a cute money gif" />

