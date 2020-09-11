const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

export default async function graphQLFetch(
  query,
  variables = {},
  showError = null,
) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    if (result.errors) {
      const errors = result.errors;

      var message = '';

      if (errors) {
        /*errors.forEach((error) => {
          switch (error.extensions.exception.errno) {
            case 1062:
              message += 'This email is already linked to an account\n';
              break;

            default:
              break;
          }
        });

        showError(message);*/

        if (errors[0].extensions.code === 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          if (showError) showError(`${error.message}:\n ${details}`);
        } else if (showError) {
          //showError(`${error.extensions.code}: ${error.message}`);
        }
      }
    }
    return result;
  } catch (e) {
    if (showError) showError(`Error in sending data to server: ${e.message}`);
    return null;
  }
}
