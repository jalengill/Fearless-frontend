function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
        <div class="col-sm-6 col-md-4 mb-1">
            <div class="shadow-lg p-3 mb-5 bg-body rounded">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">
                    <p class="card-text">${starts}-${ends}</p>
                </div>
            </div>
        </div>
        `;
  }

function errorAlert(error) {
    return `
        <div class="alert alert-danger" role="alert">
            ${error}
        </div>
        `;
}

  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conference/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        let e = "!response.ok triggered"
        const html = errorAlert(e);
        const error = document.querySelector('.row');
        error.innerHTML = html;
      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            console.log(details);
            const name = details.conference.name;
            const location = details.conference.location.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = new Date(details.conference.starts).toLocaleDateString();
            const ends = new Date(details.conference.ends).toLocaleDateString();
            const html = createCard(name, description, pictureUrl, starts, ends, location);
            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }

      }
    } catch (e) {
      // Figure out what to do if an error is raised
      console.error(e);
      const html = errorAlert("catch (e) triggered");
      const error = document.querySelector('.row');
      error.innerHTML = html;
    }

  });
