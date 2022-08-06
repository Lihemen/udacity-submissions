CloudFront URL -> https://d1fx3ds25urevg.cloudfront.net/
S3 Website URL -> http://staticwebsitehosting-lihemen.s3-website-us-east-1.amazonaws.com/

Issue Encountered:
 - Content Type of index.html was set to binary/octet-stream instead of text/html which caused the page to be downloaded instead of displayed.

Solution:
  - Set Content Type of index.html to text/html in the Metadata section of the file (index.html) in the S3 Bucket