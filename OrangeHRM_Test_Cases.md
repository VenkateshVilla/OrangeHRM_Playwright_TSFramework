# OrangeHRM Test Cases

This file contains the module-wise test cases explored from the OrangeHRM demo site after logging in successfully with the default Admin credentials.

## Login Details
- Username: Admin
- Password: admin123
- Application URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Module-wise Test Cases

### 1. Admin Module

TC_ADMIN_001: Verify login with valid Admin credentials
TC_ADMIN_002: Verify login with invalid username
TC_ADMIN_003: Verify login with invalid password
TC_ADMIN_004: Verify admin user can access Admin module
TC_ADMIN_005: Add a new user with valid data
TC_ADMIN_006: Validate duplicate username is not allowed
TC_ADMIN_007: Edit existing user details
TC_ADMIN_008: Assign user roles and admin status
TC_ADMIN_009: Delete a user record
TC_ADMIN_010: Search user by username
TC_ADMIN_011: Verify validation for empty fields while adding a user
TC_ADMIN_012: Verify role-based access permissions

### 2. PIM Module

TC_PIM_001: Access PIM module from the dashboard
TC_PIM_002: Add a new employee with valid details
TC_PIM_003: Validate mandatory fields while adding an employee
TC_PIM_004: Upload employee profile picture
TC_PIM_005: Search employee by employee ID
TC_PIM_006: Search employee by name
TC_PIM_007: Edit employee personal information
TC_PIM_008: Add employee contact details
TC_PIM_009: Add emergency contact
TC_PIM_010: Add dependent details
TC_PIM_011: Add work experience details
TC_PIM_012: Add education details
TC_PIM_013: Delete employee record
TC_PIM_014: Verify employee status change
TC_PIM_015: Validate duplicate employee records

### 3. Leave Module

TC_LEAVE_001: Apply leave with valid leave dates
TC_LEAVE_002: Validate leave submission with invalid date range
TC_LEAVE_003: Check leave balance for an employee
TC_LEAVE_004: Approve leave request
TC_LEAVE_005: Reject leave request
TC_LEAVE_006: Search leave records by employee name
TC_LEAVE_007: Filter leave list by leave type
TC_LEAVE_008: View my leave summary
TC_LEAVE_009: Cancel pending leave request
TC_LEAVE_010: Validate required field check on leave form
TC_LEAVE_011: Verify holiday calendar display
TC_LEAVE_012: Verify leave history for past dates

### 4. Time Module

TC_TIME_001: Access Time module
TC_TIME_002: Submit timesheet for an employee
TC_TIME_003: Validate empty timesheet submission
TC_TIME_004: Edit timesheet entries
TC_TIME_005: Approve timesheet
TC_TIME_006: Reject timesheet
TC_TIME_007: Search timesheets by employee name
TC_TIME_008: Validate overtime entries
TC_TIME_009: Review time summary for the week
TC_TIME_010: Validate time-sheet date range logic
TC_TIME_011: Check project-based time tracking
TC_TIME_012: Verify report generation for timesheets

### 5. Recruitment Module

TC_RECRUIT_001: Open Recruitment module
TC_RECRUIT_002: Add a candidate
TC_RECRUIT_003: Validate required fields while adding candidate
TC_RECRUIT_004: Search candidate by name
TC_RECRUIT_005: Search candidate by vacancy
TC_RECRUIT_006: Schedule interview
TC_RECRUIT_007: Update candidate status to interviewed
TC_RECRUIT_008: Reject candidate application
TC_RECRUIT_009: Hire candidate
TC_RECRUIT_010: Validate job vacancy listing
TC_RECRUIT_011: Add new vacancy
TC_RECRUIT_012: Delete vacancy

### 6. My Info Module

TC_INFO_001: Open My Info section
TC_INFO_002: Update personal details
TC_INFO_003: Update contact details
TC_INFO_004: Add emergency contact
TC_INFO_005: Add dependent details
TC_INFO_006: Upload profile photo
TC_INFO_007: Edit nationality and marital status
TC_INFO_008: Add immigration details
TC_INFO_009: Add custom fields if supported
TC_INFO_010: Validate required field rules
TC_INFO_011: Save profile without making changes
TC_INFO_012: Verify updated values are retained after save

### 7. Performance Module

TC_PERF_001: Access Performance module
TC_PERF_002: Create performance review
TC_PERF_003: Assign KPI or goal to employee
TC_PERF_004: Submit employee evaluation
TC_PERF_005: Approve performance review
TC_PERF_006: Reject performance review
TC_PERF_007: Search employee review history
TC_PERF_008: Validate empty review submission
TC_PERF_009: Verify review status workflow
TC_PERF_010: Validate date and rating fields

### 8. Dashboard Module

TC_DASH_001: Verify dashboard loads successfully after login
TC_DASH_002: Validate time at work widget
TC_DASH_003: Check quick launch shortcuts
TC_DASH_004: Verify pending self-review count
TC_DASH_005: Verify candidate to interview count
TC_DASH_006: Validate user profile information displayed
TC_DASH_007: Check dashboard layout for responsiveness
TC_DASH_008: Verify navigation links are visible
TC_DASH_009: Validate buzz latest posts panel
TC_DASH_010: Verify quick access actions open correct pages

### 9. Directory Module

TC_DIR_001: Open Directory module
TC_DIR_002: Search employee by name
TC_DIR_003: Filter employees by department
TC_DIR_004: Filter employees by job title
TC_DIR_005: View employee contact details
TC_DIR_006: Validate empty search result handling
TC_DIR_007: Verify employee directory pagination if available
TC_DIR_008: Check sorting functionality for employee list

### 10. Maintenance Module

TC_MAINT_001: Access Maintenance module
TC_MAINT_002: Verify restricted access to maintenance page
TC_MAINT_003: Validate password confirmation for maintenance mode
TC_MAINT_004: Verify maintenance actions are accessible only to authorized users
TC_MAINT_005: Validate invalid password handling
TC_MAINT_006: Confirm page reset or cleanup options work as expected

### 11. Claim Module

TC_CLAIM_001: Open Claim module
TC_CLAIM_002: Submit new expense claim
TC_CLAIM_003: Validate required fields in claim form
TC_CLAIM_004: Add expense details to claim
TC_CLAIM_005: Search claim by employee name
TC_CLAIM_006: Approve claim request
TC_CLAIM_007: Reject claim request
TC_CLAIM_008: Validate reimbursement summary
TC_CLAIM_009: View claim history
TC_CLAIM_010: Check claim status workflow

### 12. Buzz Module

TC_BUZZ_001: Open Buzz module
TC_BUZZ_002: Create a new post
TC_BUZZ_003: Validate empty post submission is blocked
TC_BUZZ_004: Like a post
TC_BUZZ_005: Comment on a post
TC_BUZZ_006: Search for posts or user content
TC_BUZZ_007: Verify posts appear in feed chronology
TC_BUZZ_008: Validate user profile image on posts
TC_BUZZ_009: Check feed refresh after creating a post
TC_BUZZ_010: Validate multi-user interaction scenarios

## Notes
- These are candidate manual/automation test cases based on the OrangeHRM demo portal exploration.
- They can be converted into Playwright test specs under the `tests/` folder for automated validation.
- Add module-specific page objects under `src/pages/` for clean test implementation.
