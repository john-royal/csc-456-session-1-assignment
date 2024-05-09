APPLICATION_NAME="vite"
ENVIRONMENT_NAME="paw-environment"
ZIP_FILE="paw_app.zip"
BUILD_DIR="dist"
VITE_BUILD_COMMAND="npm run build"
S3_BUCKET="terraform-state-paw-bvasquez07"
AWS_REGION="us-east-2"




echo "Building app"
$VITE_BUILD_COMMAND

echo "compressing app into a zip file"
zip -r $ZIP_FILE $BUILD_DIR

echo "uploading application file to AWS"
aws s3 cp $ZIP_FILE s3://terraform-state-paw-bvasquez07

echo "Deploying to elastic beanstalk"
aws elasticbeanstalk create-application-version \
  --application-name $APPLICATION_NAME \
  --version-label $(date +%Y%m%d%)env \
  --source-bundle S3Bucket="$S3_BUCKET",S3Key="$ZIP_FILE" \
  --region $AWS_REGION

aws elasticbeanstalk update-environment \
  --application-name $APPLICATION_NAME \
  --environment-name $ENVIRONMENT_NAME \
  --version-label $(date +%Y%m%d%)env\
  --region $AWS_REGION

