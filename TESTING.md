\# Cat Tracker — Sprint 1 Manual Testing



\*\*Student:\*\* Fahamida Hena  

\*\*Course:\*\* CS 319 — Fundamentals of Software Engineering  

\*\*Project:\*\* Cat Tracker  

\*\*Sprint:\*\* 1



\## Test Results



| Test                              | Expected Result                    | Actual Result                   | Status |

|---                                |---                                 |---                              |---     |

| Add a cat                         | Cat profile is saved and displayed | Added Mini successfully         | PASS   |

| View multiple cats                | Both cat profiles appear           | Chunchun and Mini appeared      | PASS   |

| Edit a cat                        | Updated information is displayed   | Mini's age changed from 2 to 3  | PASS   |

| Missing name                      | App displays an error              | Missing-field error appeared    | PASS   |

| Invalid age (50)                  | App rejects age outside 0–40       | Age validation error appeared   | PASS   |

| Delete a cat                      | Cat is removed after confirmation  | Mini was removed                | PASS   |

| Cancel deletion                   | Cat remains when Cancel is clicked | Chunchun remained               | PASS   |

| Refresh page                      | Saved cat information remains      | Chunchun remained after refresh | PASS   |



\## Known Limitations



\- Live GPS tracking is not available in Sprint 1.

\- Cat information is saved only in the current browser using localStorage.

\- There are no user accounts or cloud backups.

\- Automated testing is not included in Sprint 1.



\## Testing Summary



Manual testing covered adding, viewing, editing, deleting, input validation, and saving cat profiles. The tested features worked as expected.

