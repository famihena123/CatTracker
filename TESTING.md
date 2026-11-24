# Cat Tracker - Sprint 2 Testing

**Author:** Fahamida Hena

## Automated Testing

Testing framework: Vitest

Run the tests using:

    npm ci
    npm test

## Automated Test Results

| Story | Test | Result |
|---|---|---|
| US-05 | Save a valid location with a timestamp | PASS |
| US-05 | Reject an empty location | PASS |
| US-05 | Reject a missing cat | PASS |
| US-05 | Preserve saved location records | PASS |
| US-06 | Show locations for the selected cat | PASS |
| US-06 | Show the most recent location first | PASS |
| US-06 | Return empty history for a cat without records | PASS |

## Manual Test Results

| Story | Test | Actual Result | Status |
|---|---|---|---|
| US-05 | Add a location | Location saved successfully | PASS |
| US-06 | View location history | Saved location and timestamp displayed | PASS |
| US-06 | Check location order | Bedroom displayed before Living room | PASS |
| US-06 | Select a cat without records | No location records yet message displayed | PASS |

## Testing Summary

- Total automated tests: 7
- Passed: 7
- Failed: 0
- All four documented manual checks passed.

## Known Limitations

- Live GPS tracking is not implemented.
- Locations are entered manually.
- Data is stored locally in the browser.
- No user accounts or cloud backups.
