/*
The MIT License (MIT)

Copyright (c) Michael Wuergler <wuergler@gmail.com> (https://github.com/radiovisual)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code comes from radiovisual/get-video-id.

I don't need the whole package, so I extracted only the YouTube part.

https://github.com/radiovisual/get-video-id
*/

/**
 * Strip away any remaining parameters following `?` or `/` or '&' for YouTube shortcode strings.
 *
 * @note this function is not meant to work with url strings containing a protocol like https://
 * @param {String} shortcodeString - the parameter string
 * @returns {String}
 */
function stripParameters(shortcodeString) {
  // Split parameters or split folder separator
  if (shortcodeString.includes("?")) {
    return shortcodeString.split("?")[0];
  }

  if (shortcodeString.includes("/")) {
    return shortcodeString.split("/")[0];
  }

  if (shortcodeString.includes("&")) {
    return shortcodeString.split("&")[0];
  }

  return shortcodeString;
}

/**
 * Get the Youtube Video id.
 * @param {string} youtubeString - the url from which you want to extract the id
 * @returns {string|undefined}
 */
export function getYoutubeVideoId(youtubeString) {
  let string_ = youtubeString;

  // Remove time hash at the end of the string
  string_ = string_.replace(/#t=.*$/, "");

  // Strip the leading protocol
  string_ = string_.replace(/^https?:\/\//, "");

  // Shortcode
  const shortcode = /youtube:\/\/|youtu\.be\/|y2u\.be\//g;

  if (shortcode.test(string_)) {
    const shortcodeid = string_.split(shortcode)[1];
    return stripParameters(shortcodeid);
  }

  // Shorts
  const shortsUrl = /\/shorts\//g;
  if (shortsUrl.test(string_)) {
    return stripParameters(string_.split(shortsUrl)[1]);
  }

  // /v/ or /vi/
  const inlinev = /\/v\/|\/vi\//g;

  if (inlinev.test(string_)) {
    const inlineid = string_.split(inlinev)[1];
    return stripParameters(inlineid);
  }

  // V= or vi=
  const parameterv = /v=|vi=/g;

  if (parameterv.test(string_)) {
    const array = string_.split(parameterv);
    return stripParameters(array[1].split("&")[0]);
  }

  // Format an_webp
  const parameterwebp = /\/an_webp\//g;

  if (parameterwebp.test(string_)) {
    const webp = string_.split(parameterwebp)[1];
    return stripParameters(webp);
  }

  // /e/
  const eformat = /\/e\//g;

  if (eformat.test(string_)) {
    const estring = string_.split(eformat)[1];
    return stripParameters(estring);
  }

  // Embed
  const embedreg = /\/embed\//g;

  if (embedreg.test(string_)) {
    const embedid = string_.split(embedreg)[1];
    return stripParameters(embedid);
  }

  // ignore /user/username pattern
  const usernamereg = /\/user\/([a-zA-Z\d]*)$/g;

  if (usernamereg.test(string_)) {
    return undefined;
  }

  // User
  const userreg = /\/user\/(?!.*videos)/g;

  if (userreg.test(string_)) {
    const elements = string_.split("/");
    return stripParameters(elements.pop());
  }

  // Attribution_link
  const attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

  if (attrreg.test(string_)) {
    return stripParameters(string_.match(attrreg)[1]);
  }

  return undefined;
}
