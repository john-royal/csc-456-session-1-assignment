APPLICATION_NAME="paw_bvasquez07"
ENVIRONMENT_NAME="vite-environment"
ZIP_FILE="application.zip"
BUILD_DIR="dist"
VITE_BUILD_COMMAND="npm run build"
S3_BUCKET="elasticbeanstalk-us-east-2-548433422951"
AWS_REGION="us-east-2"


# Step 1: Build your Vite project
echo "Building aplication"
$VITE_BUILD_COMMAND

# Step 2: Package your application into a ZIP file
echo "Packaging application into a ZIP file..."
zip -r $ZIP_FILE $BUILD_DIR

# Step 3: Deploy the ZIP file to Elastic Beanstalk
echo "Deploying application to Elastic Beanstalk..."
aws elasticbeanstalk create-application-version \
  --application-name $APPLICATION_NAME \
  --version-label $(date +%Y%m%d%H%M%S) \
  --source-bundle S3Bucket="$S3_BUCKET",S3Key="$ZIP_FILE" \
  --region $AWS_REGION

aws elasticbeanstalk update-environment \
  --application-name $APPLICATION_NAME \
  --environment-name $ENVIRONMENT_NAME \
  --version-label $(date +%Y%m%d%H%M%S)\
  --region $AWS_REGION

echo "Deployment complete!"
