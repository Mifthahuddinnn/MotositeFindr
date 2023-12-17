const Home = {
  async render() {
    return `
    <jumbotron-section></jumbotron-section>
    <statistic-section></statistic-section>
    <community-section></community-section>
    <about-section></about-section>
    `;
  },

  async afterRender() {

  },
};

export default Home;