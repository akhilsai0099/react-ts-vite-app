export const isValidEmail = (email: string): boolean => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isValidMobileNumber = (mobileNumber: string): boolean => {
    // Regular expression for 10-digit mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobileNumber);
}