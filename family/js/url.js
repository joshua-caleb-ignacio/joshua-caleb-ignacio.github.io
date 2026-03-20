export function encodeUtf8ToUrlSafeBase64(str) {
  const utf8Bytes = new TextEncoder().encode(str);
  const binaryString = String.fromCharCode(...utf8Bytes);
  let base64String = btoa(binaryString);
  base64String = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return base64String;
}

export function decodeUrlSafeBase64ToUtf8(base64Str) {
  let base64 = base64Str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binaryString = atob(base64);
  const utf8Bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
  return new TextDecoder().decode(utf8Bytes);
}
