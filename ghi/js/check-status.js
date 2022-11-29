
const payloadCookie = await cookieStore.get("jwt_access_payload");
console.log(payloadCookie.value)// FINISH THIS
if (payloadCookie) {
//   // The cookie value is a JSON-formatted string, so parse it
//   const encodedPayload = JSON.parse(payloadCookie.value);

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(payloadCookie.value);// FINISH THIS

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload);// FINISH THIS

  // Print the payload
  console.log(payload);

  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes("events.add_conference")) {
    // Remove "d-none" from the link
    const conferenceLink = document.getElementById('conference-link');
    conferenceLink.classList.remove('d-none');
  }


  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link
  if (payload.user.perms.includes("events.add_location")) {
    // Remove "d-none" from the link
    const LocationLink = document.getElementById('location-link');
    LocationLink.classList.remove('d-none');
  }

}
