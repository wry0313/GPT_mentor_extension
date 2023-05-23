/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
// Add event listener to the button
document.addEventListener('DOMContentLoaded', function () {
  const printButton = document.getElementById('printButton');
  const cleanButton = document.getElementById('cleanButton');
  const minTime = 10;

  // Attach click event handler to the button
  printButton.addEventListener('click', function () {
    // Send a message to background.js
    chrome.runtime.sendMessage({
      action: 'print'
    });
  });
  cleanButton.addEventListener('click', function () {
    // Send a message to background.js
    chrome.runtime.sendMessage({
      action: 'clean',
      minTime
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBQSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVk7RUFDdEQsTUFBTUMsV0FBVyxHQUFHRixRQUFRLENBQUNHLGNBQWMsQ0FBQyxhQUFhLENBQUM7RUFDMUQsTUFBTUMsV0FBVyxHQUFHSixRQUFRLENBQUNHLGNBQWMsQ0FBQyxhQUFhLENBQUM7RUFDMUQsTUFBTUUsT0FBTyxHQUFHLEVBQUU7O0VBRWxCO0VBQ0FILFdBQVcsQ0FBQ0QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDaEQ7SUFDQUssTUFBTSxDQUFDQyxPQUFPLENBQUNDLFdBQVcsQ0FBQztNQUFFQyxNQUFNLEVBQUU7SUFBUSxDQUFDLENBQUM7RUFDakQsQ0FBQyxDQUFDO0VBRUZMLFdBQVcsQ0FBQ0gsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDOUM7SUFDQUssTUFBTSxDQUFDQyxPQUFPLENBQUNDLFdBQVcsQ0FBQztNQUFFQyxNQUFNLEVBQUUsT0FBTztNQUFFSjtJQUFRLENBQUMsQ0FBQztFQUMxRCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRncHQtZXh0ZW5zaW9uLWRhaWx5LXN1bW1lcnkvLi9zcmMvcG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBidXR0b25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcHJpbnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpbnRCdXR0b24nKTtcbiAgICBjb25zdCBjbGVhbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhbkJ1dHRvbicpO1xuICAgIGNvbnN0IG1pblRpbWUgPSAxMDsgXG4gIFxuICAgIC8vIEF0dGFjaCBjbGljayBldmVudCBoYW5kbGVyIHRvIHRoZSBidXR0b25cbiAgICBwcmludEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFNlbmQgYSBtZXNzYWdlIHRvIGJhY2tncm91bmQuanNcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAncHJpbnQnIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGNsZWFuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBTZW5kIGEgbWVzc2FnZSB0byBiYWNrZ3JvdW5kLmpzXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgYWN0aW9uOiAnY2xlYW4nLCBtaW5UaW1lIH0pO1xuICAgICAgfSk7XG4gIH0pO1xuICAiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJpbnRCdXR0b24iLCJnZXRFbGVtZW50QnlJZCIsImNsZWFuQnV0dG9uIiwibWluVGltZSIsImNocm9tZSIsInJ1bnRpbWUiLCJzZW5kTWVzc2FnZSIsImFjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=