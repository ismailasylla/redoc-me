import * as React from 'react';

class XextendedDescription extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ color: 'white' }}>XextendedDescription</h1>
        <div className="method-example-part">
          <div className="method-example-table">
            <div className="method-example-table-topbar" style={{backgroundColor:'#2a2f45', padding:'10px', borderRadius:'8px', marginBottom:'-23px'}}>
              <div className="method-example-table-title" style={{color:'#9199a8'}}>HTTP status code summary</div>
            </div>
            <section className="table">
              <table className="table-container" style={{borderBottomLeftRadius:'8px', borderBottomRightRadius:'8px'}}>
                <tbody style={{backgroundColor:"#00FF00"}}>
                  <tr id="errors-200-OK">
                    <th className="table-row-property">
                      <span>200 - OK</span>
                    </th>
                    <td className="table-row-definition">
                      <span>Everything worked as expected.</span>
                    </td>
                  </tr>
                  <tr id="errors-400-BadRequest">
                    <th className="table-row-property">
                      <span>400 - Bad Request</span>
                    </th>
                    <td className="table-row-definition">
                      <span>
                        The request was unacceptable, often due to missing a required parameter.
                      </span>
                    </td>
                  </tr>
                  <tr id="errors-401-Unauthorized">
                    <th className="table-row-property">
                      <span>401 - Unauthorized</span>
                    </th>
                    <td className="table-row-definition">
                      <span>No valid API key provided.</span>
                    </td>
                  </tr>
                  <tr id="errors-402-RequestFailed">
                    <th className="table-row-property">
                      <span>402 - Request Failed</span>
                    </th>
                    <td className="table-row-definition">
                      <span>The parameters were valid but the request failed.</span>
                    </td>
                  </tr>
                  <tr id="errors-403-Forbidden">
                    <th className="table-row-property">
                      <span>403 - Forbidden</span>
                    </th>
                    <td className="table-row-definition">
                      <span>The API key doesn't have permissions to perform the request.</span>
                    </td>
                  </tr>
                  <tr id="errors-404-NotFound">
                    <th className="table-row-property">
                      <span>404 - Not Found</span>
                    </th>
                    <td className="table-row-definition">
                      <span>The requested resource doesn't exist.</span>
                    </td>
                  </tr>
                  <tr id="errors-409-Conflict">
                    <th className="table-row-property">
                      <span>409 - Conflict</span>
                    </th>
                    <td className="table-row-definition">
                      <span>
                        The request conflicts with another request (perhaps due to using the same
                        idempotent key).
                      </span>
                    </td>
                  </tr>
                  <tr id="errors-429-TooManyRequests">
                    <th className="table-row-property">
                      <span>429 - Too Many Requests</span>
                    </th>
                    <td className="table-row-definition">
                      <span>
                        Too many requests hit the API too quickly. We recommend an exponential
                        backoff of your requests.
                      </span>
                    </td>
                  </tr>
                  <tr id="errors-429-TooManyRequests">
                    <th className="table-row-property">
                      <span>429 - Too Many Requests</span>
                    </th>
                    <td className="table-row-definition">
                      <span>
                        Too many requests hit the API too quickly. We recommend an exponential
                        backoff of your requests.
                      </span>
                    </td>
                  </tr>
                  <tr id="errors-500502503504-ServerErrors">
                    <th className="table-row-property">
                      <span>500, 502, 503, 504 - Server Errors...</span>
                    </th>
                    <td className="table-row-definition">
                      <span>Something went wrong on Stripe's end. (These are rare.)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default XextendedDescription;
