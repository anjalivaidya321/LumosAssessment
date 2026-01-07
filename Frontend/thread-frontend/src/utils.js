export function getDisplayName(commentId) {
    if (!commentId) return "User";
    const nameSeed = commentId.slice(-2) || "00";
    const names = ["Ali", "Riya", "Sam", "Mia", "Leo", "Asha", "Noah", "Zara", "Jay", "Eva"];
    // Use hex parsing for better distribution from potential ObjectID
    return names[parseInt(nameSeed, 16) % names.length] || "User";
}
