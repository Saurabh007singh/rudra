import { FaStar, FaRegStar } from 'react-icons/fa'; // For star ratings

// Function to render stars based on rating
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? <FaStar key={i} className="text-[#9B7237]" /> : <FaRegStar key={i} className="text-[#9B7237]" />);
  }
  return stars;
};

export function ReviewsSection({ reviews }) {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="reviews-section py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        
        {/* Display Average Rating */}
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold text-gray-700">{averageRating ? averageRating.toFixed(1):null} </span>
          <div className="flex text-[#9B7237] ml-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="ml-2 text-gray-600">{reviews.length} Reviews</span>
        </div>

        {/* Display Reviews */}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-item p-6 mb-6 border border-gray-300 rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">{review.userId.userName}(Verified Buyer)</span>
                <div className="flex text-[#9B7237]">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{review.reviewText}</p>
              <div className="text-xs text-gray-500">
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </section>
  );
}
