<script>

</script>

<div class="container">
  <div class="content">
    <h2>Motivation</h2>

    <p>
      There are enormous datasets consisting of texts with geo coordinates such
      as Twitter check-in points, Instagram check-in captions, Tourists place
      reviews like TripAdvisor and Yelp. A traditional approach of data
      visualisation will be plotting out the location and texts respectively via
      maps by geocomputing and charts yielded from natural language processing.
      However, the separated data treatment may cost some information lost.
      Hence, this webapp is motivated by increasing demand for visualisation of
      location-based information in order to link the words/ texts to geographic
      information by an interactive data visualisation.
    </p>

    <h2>Project Objective</h2>

    <p>
      This project will take Wikipedia as an example. By looking at the
      locations in Singapore which have been listed on Wikipedia with their own
      page, this Web App will be able to provide an overview of the notion of
      visualization of location-based texts.
    </p>

    <h2>Data Source</h2>
    <p>
      The data were retrieved from
      <a href="https://www.mediawiki.org/wiki/MediaWiki">Media Wiki API</a>
      which is widely used by varied websites, companies and organizations,
      including Wikipedia. It is free and open to make knowledge available to
      people by providing searchable content, so that it is easy to retrieve
      archived information.
    </p>

    <h2>Data Process</h2>

    <p>
      Initially, it converted Singapore to hexagons. The hexagon divides
      Singapore as a unit of 1 km. Each hexagon grid will be attributed a unique
      id as HEX_ID. The dataset consists of 1233 wikipedia pages of locations.
      Each location has its geocoordinate, page id, title of the page and the
      content of the article. Here filters the dataset which only includes
      locations within Singapore. As a result, there are 1140 locations with
      Wikipedia pages. Each location will be assigned a hex_id by checking the
      point is within the hexagons. Therefore, the texts will be aggregated by
      HEX_ID.
    </p>
    <br />

    <p>
      Then, tokenization and lemmatization are also important to retrieve
      information. A token is a meaningful unit of text, such as a word, that we
      are interested in using for analysis, and tokenization is the process of
      splitting text into tokens. In a simple way, tokenization means breaking a
      sentence into words and filter out the unimportant information which
      usually refers to words such as the, a, that, so as well as punctuations.
      However, tokenization may not promise a clean dataset, since some words in
      different formats and tense will be counted respectively. For example,
      “located ” and “locate”, “schools” and “school” and so on. Hence, it will
      require to apply lemmatization to extract the stem of the words in order
      to reduce the interference. Besides, some techniques like Bi-gram and
      Trigram wound are also applied to the texts for extracting some short
      phrases like “MRT station”, “Lee Kuan Yew '' and so on.
    </p>
    <br />

    <p>
      Later, the processed tokens will be the input dataset (Corpus), it will be
      converted into a document-term matrix while in this case, the document
      will refer to the hexagon which collects the Wikipedia articles. The
      question is how to categorize the documents (hexagons) into different
      topics. For answering this question , the project turns to topic models
      for a potential solution. Topic model is one of the popular models applied
      for natural language processing. It is also called Latent Dirichlet
      allocation. It assumed that every document is a mixture of topics, and
      every topic is a mixture of words. The model will estimate both at the
      same time in order to predict the possible topic. For now, the topic
      number is set to 8 after a few rounds of manual selections. It will also
      return the information of the terms consisting of each topic with a beta
      value.
    </p>
    <br />

    <p>
      With more detailed explanation, please check the
      <a href="https://02522-cua.github.io/liu-nuozhi/">link</a>
      of my project for 02.522: Urban Data & Methods II: Computational Urban
      Analysis.
    </p>

    <h2>Components of the website</h2>

    <p>
      The website consists of three main components: a map, a bar chart and a
      bubble chart. The map shows how the topics are spatially related. The bar
      chart provides the information of the topics distribution. The bubble
      chart visualized the most frequent and important tokens. The larger the
      radius of the bubble, the more contribution to the topic it made. By
      clicking the bar chart, you will be able to examine each topic on the map,
      with the bubble chart showing the composition of this topic. Once you
      click on the word, you will be able to see where the spatial distribution
      of the word is. Additionally, you can also click on the hexagon, then it
      will return a list of articles which have the same hex_id. If you click
      either of the articles, you will be able to read the whole article with
      the token highlights.
    </p>

    <h2>Limitation and future works</h2>

    <p>
      Currently, the map has poor performance on incorporating with the bar
      chart and the bubble chart at the same. One main reason is that the
      database indexing by topic id and word both is still under developing.
      Also, the highlighting on the words is still needed improvement, since
      sometimes the matching conditions are still malfunctioning in some cases.
    </p>

    <h2>Acknowledgement</h2>

    <p>
      The project is the final project for
      <a href="https://02526-idv-2020.netlify.app/">
        02.526: Interactive Data Visualization
      </a>
      at SUTD. I would like to express my deepest appreciation to the course
      teacher Prof. Ate Poorthuis, and the teaching team who have provided my
      helping on the learning track.
    </p>

  </div>
</div>

<style>
  .container {
    width: 60%;
    margin: 5rem;
  }

  h2 {
    font-family: "Acme", sans-serif;
    font-size: 2em;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  p {
    line-height: 1.8em;
  }
</style>
