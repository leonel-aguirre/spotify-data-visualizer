const handler = (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml")

  res.send(`
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100% 100%" fill="none" role="img">
    <rect x="0" y="0" rx="10" height="100%" width="100%" class="background" />
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" class="main-container">
        <h3 xmlns="http://www.w3.org/1999/xhtml" class="title">Component Title</h3>
        <p xmlns="http://www.w3.org/1999/xhtml" class="text-elements">
          <span class="red-text">Bring Me The Horizon</span>
          <span class="white-text">Dua Lipa</span>
          <span class="blue-text">MIKA</span>
          <span class="purple-text">Waterparks</span>
          <span class="green-text">DON BROCO</span>
          <span class="yellow-text">The Wombats</span>
          <span class="green-text">All Time Low</span>
          <span class="white-text">Royal Blood</span>
          <span class="red-text">The Wrecks</span>
          <span class="yellow-text">Panic! At The Disco</span>
          <span class="blue-text">Twenty One Pilots</span>
          <span class="purple-text">almost monday</span>
          <span class="red-text">Bring Me The Horizon</span>
          <span class="white-text">Dua Lipa</span>
          <span class="blue-text">MIKA</span>
          <span class="purple-text">Waterparks</span>
          <span class="green-text">DON BROCO</span>
          <span class="yellow-text">The Wombats</span>
          <span class="green-text">All Time Low</span>
          <span class="white-text">Royal Blood</span>
          <span class="red-text">The Wrecks</span>
          <span class="yellow-text">Panic! At The Disco</span>
          <span class="blue-text">Twenty One Pilots</span>
          <span class="purple-text">almost monday</span>
        </p>
      </div>
    </foreignObject>
    <style>
      @font-face {
        font-family: "Poppins";
        src: url("https://spotify-data-visualizer-ten.vercel.app/static/fonts/Poppins/Poppins-Bold.ttf") format("truetype");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }

      * {
        margin: 0;
        box-sizing: border-box;
        font-family: Poppins, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
          "Droid Sans", "Helvetica Neue", sans-serif;
      }

      .background {
        fill: #16161d;
      }

      .main-container {
        display: flex;
        flex-direction: column;
        padding: 16px;
      }

      .title {
        color: #f8f8ff;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
      }

      .text-elements {
        font-weight: bold;
        text-align: center;
        border-top: 3px solid #f8f8ff;
        border-bottom: 3px solid #f8f8ff;
        padding: 16px 0;
        margin-top: 16px;
      }

      .white-text {
        color: #f8f8ff;
      }

      .red-text {
        color: #fc2453;
      }

      .blue-text {
        color: #3185fc;
      }

      .yellow-text {
        color: #fce15a;
      }

      .green-text {
        color: #9883e5;
      }

      .purple-text {
        color: #40f99b;
      }
    </style>
  </svg>
  `)
}

export default handler
