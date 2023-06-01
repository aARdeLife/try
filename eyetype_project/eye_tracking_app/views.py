from django.shortcuts import render
import cv2

def eye_tracking_view(request):
    # Perform eye tracking using OpenCV
    # Add your eye tracking code here

    # Pass the detected eye positions to the template context
    context = {
        'eye_positions': eye_positions,  # Replace with your eye positions data
    }

    return render(request, 'eye_tracking.html', context)
