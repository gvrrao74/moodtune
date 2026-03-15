from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PLAYLIST_DB = {
    "motivation": {
        "Phonk": "2GtqIMAM4q2mq1R2bxgzUn",
        "Rock": "7DgPQwzEoUVfQYBiMLER9Z",
        "Hardstyle": "7kRyMz3BjbJ6FUJOD4CU7I",
        "Jumpstyle": "1PTDqYolOlJayKMiLulOhx"
    },
    "chill": {
        "LoFi": "37i9dQZF1DWYoYGBbGKurt",
        "Jazz": "37i9dQZF1DXbITWG1ZJKYt",
        "Wavephonk": "6ZpQnNbtOOSNcT3wJPh28L",
        "Synthwave": "37i9dQZF1EIhdusJHpCNoA"
    },
    "focus": {
        "Classical": "0QknRAZUpwPtM2dQIzAnAa",
        "Ambient": "0XmZPUrmpzDrsEfpW7cQc3",
        "Nature": "2e3rjSsz1U1tF8rFnoh9lm"
    },
    "sad": {
        "Indie": "37i9dQZF1DXb9izPIc0SCS",
        "Piano": "4Fpb3laeyhiOhL3Jut7NCR",
        "Slowed": "6yGC0NTItxZ9RdNsEBszNm"
    }
}

@app.get("/recommend")
def recommend_music(mood: str, genre: str):
    playlist_id = PLAYLIST_DB.get(mood, {}).get(genre, "37i9dQZF1DWYoYGBbGKurt")
    return {"playlist_id": playlist_id}

# Mount static folder and serve index
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def serve_index():
    return FileResponse("static/index.html")