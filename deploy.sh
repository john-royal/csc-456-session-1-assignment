APPLICATION_NAME="vite"
ENVIRONMENT_NAME="paw-environment"
ZIP_FILE="paw_app.zip"
BUILD_DIR="dist"
S3_BUCKET="terraform-state-paw-bvasquez07"
AWS_REGION="us-east-2"

echo "Building app"
npm run build

echo "compressing app into a zip file"
zip -r paw_app.zip dist

echo "uploading application file to AWS"
aws s3 cp paw_app.zip s3://terraform-state-paw-bvasquez07

echo "Deploying to elastic beanstalk"
aws elasticbeanstalk create-application-version \
  --application-name vite \
  --version-label $(date +%Y%m%d%)env \
  --source-bundle S3Bucket="terraform-state-paw-bvasquez07",S3Key="paw_app.zip" \
  --region us-east-2

aws elasticbeanstalk update-environment \
  --application-name vite \
  --environment-name paw-environment \
  --version-label $(date +%Y%m%d%)env\
  --region us-east-2

