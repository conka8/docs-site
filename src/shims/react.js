// React is loaded from the CDN as a global (see build.mjs), so imports of "react" resolve here.
const React = window.React;
export default React;
export const { useState, useEffect, useMemo, useRef, useCallback, Fragment } = React;
