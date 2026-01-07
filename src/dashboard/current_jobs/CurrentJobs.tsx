import React, { useEffect, useState } from 'react';
import { JobTreeResponse } from '../../shared/api/types';
import { api } from '../../shared/api/client';
import './CurrentJobs.css';

/**
 * CurrentJobs
 *
 * This component displays all current jobs.
 * Jobs are fetched using the "get all jobs" API call.
 *
 * Features:
 * - Refresh button to manually re-fetch jobs
 * - While refreshing:
 *   - isLoading is set to true
 *   - pointer events are disabled to prevent further refreshes
 * - If fetching fails, an error message is displayed
 */
export function CurrentJobs() {
    /**
     * isLoading
     *
     * Used to:
     * - Prevent overlapping API requests
     * - Disable pointer events during refresh
     * - Show visual loading feedback (reduced opacity + rotating icon)
     */
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * jobs
     *
     * Holds the fetched jobs data:
     * - null  → no fetch performed yet
     * - JobTreeResponse → successful fetch
     * - 'error' → failed to fetch jobs
     */
    const [jobs, setJobs] = useState<JobTreeResponse | 'error' | null>(null);

    useEffect( fetchAndUpdateJobs , []); /* fetch jobs at mount */

    /**
     * fetchAndUpdateJobs
     *
     * Triggered by the Refresh button.
     * Handles:
     * - Guarding against concurrent refresh attempts
     * - Setting loading state before and after the async call
     * - Delegating the actual async work to fetchAndUpdateJobsCore
     */
    function fetchAndUpdateJobs() {
        // If already loading, skip to prevent overlapping requests
        if (isLoading) {
            console.log('Currently loading, skipping fetch.');
            return;
        }

        // Mark the refresh process as started
        setIsLoading(true);

        // Trigger the async jobs fetch
        fetchAndUpdateJobsCore();
    }

    /**
     * fetchAndUpdateJobsCore
     *
     * Performs the actual async API call to fetch all jobs.
     * Updates the jobs state based on success or failure.
     */
    async function fetchAndUpdateJobsCore() {
        console.log('fetchAndUpdateJobsCore called');

        try {
            // Fetch all current jobs from the backend
            const jobs: JobTreeResponse = await api.getAllJobs();
            setJobs(jobs);
        } catch {
            // If an error occurs, we don't have jobs to show
            setJobs('error');
        } finally {
            // Mark the refresh process as completed
            setIsLoading(false);
        }
    }

    return (
        /**
         * Root container for the Current Jobs view
         *
         * When isLoading is true:
         * - opacity is reduced
         * - pointer events are disabled
         */
        <div
            className={`current-jobs ${isLoading ? 'current-jobs--loading' : ''}`}
        >
            {/* 
              Header section
              ------------------------------------------------
              Contains:
              - Title and subtitle describing the page
              - Refresh button for re-fetching jobs
            */}
            <div className="current-jobs__header">
                {/* Title and description */}
                <div className="workspace-header">
                    <div className="workspace-title">
                        Current Jobs
                    </div>
                    <div className="workspace-subtitle">
                        Monitor and manage running automation tasks.
                    </div>
                </div>

                {/* Refresh button */}
                <button
                    className="action-button default"
                    onClick={fetchAndUpdateJobs}
                >
                    {/* Refresh icon (rotates while loading) */}
                    <span
                        className={`action-button__icon ${
                            isLoading ? 'rotate' : ''
                        }`}
                    >
                        &#x21bb;
                    </span>

                    {/* Button label */}
                    <span>Refresh List</span>
                </button>
            </div>

            {/*
              Content section
              ------------------------------------------------
              - If jobs === 'error' → show error message
              - Otherwise → show the list of jobs
            */}
            {jobs === 'error' ? (
                <div className="action-form__error">
                    Failed to fetch
                </div>
            ) : (
                <div>
                    {/* Temporary jobs rendering (raw JSON) */}
                    Jobs: {JSON.stringify(jobs)}
                </div>
            )}

            {/* Visual spacing below the content */}
            <div className="workspace-spacer-lg" />
        </div>
    );
}
