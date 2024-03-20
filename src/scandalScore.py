from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import praw

analyzer = SentimentIntensityAnalyzer()

app = Flask(__name__)
CORS(app)  

@app.route('/sentiment', methods=['GET'])
def get_sentiment():
    movie_title = request.args.get('movie_title')
    if movie_title:
        total_score = 0
        num_comments = 0

        reddit = praw.Reddit(client_id='-qZIPOdSimD2BklZp5PSWw', 
                             client_secret='AYKyne5C3GRMAoxUXpDTadvuVxUEwQ', 
                             user_agent='WebScraping')

        # Search for the movie title on Reddit
        search_results = reddit.subreddit("all").search(movie_title, limit=5, sort="relevance")
        for submission in search_results:
            # Extract comments from the thread
            submission.comments.replace_more(limit=0)
            for comment in submission.comments.list():
                # Analyze sentiment of the comment text
                sentiment_score = analyzer.polarity_scores(comment.body)
                # Add the compound score to the total score
                total_score += sentiment_score['compound']
                # Increment the number of comments
                num_comments += 1

        # Calculate the average sentiment score
        if num_comments > 0:
            average_score = total_score / num_comments
            rounded_average_score = round(average_score, 2)

            # Return the average score along with the movie title
            return jsonify({'movie_title': movie_title, 'scandal_score': rounded_average_score})
        else:
            return jsonify({'error': 'No comments found for the given movie title'})
    else:
        return jsonify({'error': 'Movie title not provided'})

if __name__ == '__main__':
    app.run(debug=True)
