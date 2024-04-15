export async function getJSON(url) {
  try {
    const res = await fetch(url);
    //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
    //console.log(res);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}
export async function sendJSON(url, uploadData) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
    //console.log(res);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}
