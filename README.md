# Job Portal Navigation/Application Fix

Replace the matching files in your project with these files.

Main fixes:
- Homepage recent jobs now come from `GET /api/jobs` instead of numeric mock jobs.
- JobCard navigates only with `job._id`.
- JobDetails fetches the real job and opens the apply form with `job._id`.
- ApplyForm validates the ObjectId and submits multipart data through the Axios instance.
- MyApplications fetches `GET /api/applications` and uses `application.job._id`.
- Apply/My Applications routes use the actual backend role name: `jobseeker`.
- Backend POST application route returns 400 for an invalid job ID instead of a Mongoose cast 500.

After replacing files, remove/reinstall frontend dependencies if Vite reports a missing native Rolldown binding:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```
