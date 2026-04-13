import React from 'react'

import ProcessStepper from '../../../components/ui/ProcessStepper'

import WorkspaceIntro from '../../../components/features/OnBoarding/WorkspaceIntro'
import WorkspaceProfile from '../../../components/features/OnBoarding/WorkspaceProfile'
import WorkspacePageSelection from '../../../components/features/OnBoarding/WorkspacePageSelection'

const steps = [
    {
        id: 1,
        label: 'Get Started',
        description: 'Welcome to CompIntel! Let’s set up your workspace.',
        component: <WorkspaceIntro />
    },
    {
        id: 2,
        label: 'Workspace Profile',
        description: 'Tell us a bit about your workspace to get started.',
        component: <WorkspaceProfile />
    },
    {
        id: 3,
        label: 'Page Selection',
        description: 'Select the pages you want to monitor.',
        component: <WorkspacePageSelection />
    },
    
]

function OnBoarding() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f8f9fa] py-5">
            <div className="w-full max-w-5xl p-8 rounded-lg shadow-lg bg-white">
                <h2 className="text-3xl font-bold mb-6 text-center">Welcome to CompIntel</h2>
                <p className="text-center text-gray-600 mb-8">Let's get you set up with a few simple steps.</p>
                <ProcessStepper currentStep={1} steps={steps} />
            </div>
        </div>
    )
}

export default OnBoarding
