# PhotoShare Web App
A one-week group project! PhotoShare is a web application dedicated to documenting your life through photographs.

## Table of Contents
1. [Project Design](#project-design)
2. [Front End](#front-end)
3. [Development Stack](#development-stack)
4. [Database Design](#database-design)
5. [API Architecture](#api-architecture)
6. [Favorite Code](#favorite-code)
7. [Challenges](#challenges)

## Project Design
## Front End
## Development Stack
## Database Design
## API Architecture

## Favorite Code
### Eri
My favorite chunk of code is where I figured out how to take the photo that I upload to Cloudinary API and immediately display that back to the user during the post creation process.

```tsx
<PhotoUploadButton onPhotoUploaded={showUploadedPhoto}></PhotoUploadButton>
...
function showUploadedPhoto(public_id: string)
{
    const img = cld
    .image(public_id)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));

    setUploadedImg(img);
    setPublicId(public_id);
}

async function submitHandler(event: any)
{
    event.preventDefault();

    const newPhotoPost = {
        userId: user?.id,
        publicId: publicId,
        title: title,
        captions: captions
    }

    await photoPostService.add(newPhotoPost).then(handleClose)
...
}
```

### Hannah
### Jordan
### Tabatha

## Challenges
### Eri
**Problem:** My biggest struggle was figuring out how to allow a user to select specific photos to organize into an album. 

**Approach:** I diagrammed the process out and looked into different approaches to come up with my current solution. I used the debug console a lot to smooth out issues with async functions.

**Solution:** I update an array list each time the user selects or deselects a photo, and then perform a PUT request on each photo to sort them into an album. 

### Hannah
### Jordan
### Tabatha