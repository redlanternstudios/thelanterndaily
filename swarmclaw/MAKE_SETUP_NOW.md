# Make.com Setup — Do This Once
Created: 2026-06-16
Time to complete: ~10 minutes

Make.com's SPA blocks automation tools. These steps must be done manually in browser.
All values are below — copy-paste, no lookups needed.

---

## STEP 1 — Add Make.com Variables (Settings → Variables)

Go to: https://app.make.com → Settings (bottom left gear) → Variables → + Add variable

Add these 3 variables exactly:

| Variable Name | Value |
|---|---|
| `ADMIN_WEBHOOK_SECRET` | `606ca511175e02ad32fe9c1da761259e823b4351f2d4d671693465c1e8832489` |
| `GROQ_API_KEY` | `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` |
| `YOUTUBE_DATA_API_KEY` | `AIzaSyBlWemxUw055RQuElJ32mCiD_IomqMGVg8` |

Variables are referenced as `{{VARIABLE_NAME}}` in scenario modules. Already used this way in all blueprints.

---

## STEP 2 — Fix Scenario 03 (Content Radar)

Open Scenario 03 → click the HTTP module that posts to `/api/admin/content-radar` (module 3) → Headers:

**Change this:**
```
Header name:  X-Admin-Key
Header value: ld_admin_7xK2p9mNq_test
```

**To this:**
```
Header name:  x-admin-secret
Header value: {{ADMIN_WEBHOOK_SECRET}}
```

Save. Run Once. Confirm output shows `{ok: true, inserted: N}`.

---

## STEP 3 — Import New Scenarios

For each blueprint, go to Scenarios → + Create a new scenario → Import Blueprint:

| File | Scenario Name | Schedule after import |
|---|---|---|
| `make-blueprints/05_multi_feed.json` | Lantern - Multi-Feed Article Ingestion | Every 6h (03,09,15,21 UTC) |
| `make-blueprints/06_market_signal.json` | Lantern - Market Signal | Weekly — Fridays 12:00 UTC |
| `make-blueprints/07_video_pipeline.json` | Lantern - Video Pipeline | Every 12h (06:00 and 18:00 UTC) |

Blueprint files are in: `the-lantern/make-blueprints/`

**After importing each:**
1. Check that `{{GROQ_API_KEY}}` and `{{ADMIN_WEBHOOK_SECRET}}` resolve (shown as variable pills, not raw text)
2. Run Once → check execution log → confirm `{ok: true}` from API
3. Activate the schedule

---

## STEP 4 — Verify YouTube Channel IDs in Scenario 07

Scenario 07 has placeholder channel IDs. Before activating, verify the real channel IDs:

| Channel | Current ID in blueprint | How to verify |
|---|---|---|
| Islamic Finance Guru | `UCmFSHeXGwGNyxf2Wg1RZPmQ` | Check youtube.com/c/islamicfinanceguru → About → Share → copy channel ID |
| ProductiveMuslim | `UCpvgmxTNKVlJELBmMGHBJ8A` | Same method |
| Yaqeen Institute | `UCVd9lFKNuSSGkI08lJvgqAw` | Same method |

If wrong: open scenario 07 → find the YouTube search module for that channel → update `channelId` param.

---

## WHAT'S ALREADY DONE

✅ Supabase Realtime enabled on `lantern_content_queue` — live updates will fire to dashboard
✅ Blueprint 03 JSON updated (header + Groq prompt with halal fields)
✅ Blueprint 05, 06, 07 built and ready to import
✅ `/api/admin/content-radar` route — built and deployed
✅ `/api/admin/market-signal` route — built and deployed
✅ `/api/admin/video-signal` route — built and deployed
✅ ADMIN_WEBHOOK_SECRET and YOUTUBE_DATA_API_KEY in Vercel
✅ GROQ_API_KEY retrieved and stored in keys reference

---

## AFTER SETUP CHECKLIST

- [ ] 3 Make.com variables added
- [ ] Scenario 03 header fixed + Run Once passes
- [ ] Scenario 05 imported + Run Once passes
- [ ] Scenario 06 imported + Run Once passes
- [ ] Scenario 07 imported + YouTube channel IDs verified + Run Once passes
- [ ] All 4 scenarios activated on schedule
