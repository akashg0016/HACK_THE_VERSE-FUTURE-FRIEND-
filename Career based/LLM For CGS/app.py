
from langchain.vectorstores import FAISS
from langchain.llms import GooglePalm
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
import os

from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)


with open('decision.pkl', 'rb') as file:
   decision_tree = pickle.load(file)

# Define the route for the home page
@app.route('/')
def home():
    return render_template('index.html')

from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env (especially openai api key)

# Create Google Palm LLM model
llm = GooglePalm(google_api_key=os.environ["GOOGLE_API_KEY"], temperature=0.7)
# # Initialize instructor embeddings using the Hugging Face model
instructor_embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-large") 
vectordb_file_path = "faiss_index"

def create_vector_db():
    # Load data from FAQ sheet
    loader = CSVLoader(file_path='corrected_spelling.csv', source_column="Role")
    data = loader.load()

    # Create a FAISS instance for vector database from 'data'
    vectordb = FAISS.from_documents(documents=data,
                                    embedding=instructor_embeddings)

    # Save vector database locally
    vectordb.save_local(vectordb_file_path)


# Load the vector database from the local folder
vectordb = FAISS.load_local(vectordb_file_path, instructor_embeddings)

# Create a retriever for querying the vector database
retriever = vectordb.as_retriever(score_threshold=0.1)

def get_qa_chain():
    # Load the vector database from the local folder
    vectordb = FAISS.load_local(vectordb_file_path, instructor_embeddings)

    # Create a retriever for querying the vector database
    retriever = vectordb.as_retriever(score_threshold=0.1)

    prompt_template = """Given the following context and a question, generate an answer based on this context only.
    In the answer try to provide as much text as possible from "Education,Skills,Certifications,Experience,,Foundational Skills,Intermediate Skills,Advanced Skills" section in the source document context without making much changes.
    If the answer is not found in the context, kindly state "Education: Do some research, Skills: Make your own, Certifications: Get one for being purposeful in life, Experience: You will never have any." Don't try to make up an answer.

    CONTEXT: {context}

    QUESTION: {question}"""

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    chain = RetrievalQA.from_chain_type(llm=llm,
                                        chain_type="stuff",
                                        retriever=retriever,
                                        input_key="query",
                                        return_source_documents=True,
                                        chain_type_kwargs={"prompt": PROMPT})

# Define the route for form submission and model prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Access form data submitted by the user
        career_data = {
            
    'database' : request.form['database'],
    'computer_architecture': request.form['computer_architecture'],
    'distributed_computing': request.form['distributed_computing'],
    'cyber_security': request.form['cyber_security'],
    'networking': request.form['networking'],
    'software_development': request.form['software_development'],
    'programming_skills':  request.form['programming_skills'],
    'project_management':  request.form['project_management'],
    'computer_forensics':  request.form['computer_forensics'],
    'technical_communication':  request.form['technical_communication'],
    'ai_ml':  request.form['ai_ml'],
    'software_engineering':  request.form['software_engineering'],
    'business_analysis':  request.form['business_analysis'],
    'communication_skills':  request.form['communication_skills'],
    'data_science':  request.form['data_science'],
    'troubleshooting_skills':  request.form['troubleshooting_skills'],
    'graphics_designing':  request.form['graphics_designing']
            # Add more form data for each label in the HTML form
        }

        # Map the form data to numerical values, if needed
        # For example, you can create a dictionary to map options to numerical values
        mapping = {
            'Not Interested': 0,
            'Poor': 1,
            'Beginner': 2,
            'Average': 3,
            'Intermediate': 4,
            'Excellent': 5,
            'Professional': 6
        }

        # Convert the form data to numerical values
        for key, value in career_data.items():
            career_data[key] = str(mapping[value])

        # Convert the data to a numpy array
        data_array = np.array(list(career_data.values())).reshape(1, -1)

        # Make predictions using the loaded model
        prediction = decision_tree.predict(data_array)

        # Return the prediction as a template variable to display on the result page
        return render_template('result.html', prediction=prediction[0])

    except Exception as e:
        return render_template('error.html')

if __name__ == '__main__':
    app.run(debug=True)
