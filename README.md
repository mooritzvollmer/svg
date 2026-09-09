# SVG to CSS Background Encoder

## Overview
This project provides a simple JavaScript tool to encode SVG images for use as CSS background images. The tool converts SVG code into a properly formatted `data:image/svg+xml` URI and allows easy copying of the encoded SVG or the corresponding CSS code.

## Features
- Encodes SVG input for use in CSS `background-image`
- Provides real-time preview of the encoded SVG as a background image
- Allows users to copy the encoded SVG or generated CSS code to the clipboard

## How It Works
1. The user inputs raw SVG code into a textarea.
2. The JavaScript function `encodeSVG()` processes the SVG string by replacing special characters with their URI-encoded equivalents.
3. The encoded SVG is inserted into a `data:image/svg+xml` URI.
4. The resulting CSS `background-image` property is displayed and applied to a preview element.
5. Users can copy either the encoded SVG or the generated CSS to the clipboard with a button click.

## Usage
- Paste your SVG code into the input field.
- Copy the encoded SVG or the generated CSS code for use in your stylesheets.
- Use the preview box to see how the background image will look.

## Example Output
```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='blue'/%3E%3C/svg%3E");
```

## License
This project is open-source and available under the MIT License.

